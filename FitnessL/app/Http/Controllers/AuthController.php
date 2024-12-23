<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Str;


class AuthController extends Controller
{
    public function register(Request $request) 
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $userKey = 'user:' . $request->email;
        if (Redis::exists($userKey)) {
            return response()->json([
                'message' => 'User already exists'
            ], 400);
        }

        $hashedPassword = Hash::make($request->password);

        Redis::hmset($userKey, [
            'id' => Str::uuid(),
            'email' => $request->email,
            'password' => $hashedPassword,
            'is_first_time' => 'true',
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => Redis::hgetall($userKey)
        ], 201);
    }

    public function googleLoginRegister(Request $request) 
    {
        $userKey = 'user:' . $request->user['email'];
        
        if (!Redis::exists($userKey)) {
            Redis::hmset($userKey, [
                'id' => $request->user['id'],
                'email' => $request->user['email'],
                'family_name' => $request->user['family_name'],
                'given_name' => $request->user['given_name'],
                'name' => $request->user['name'],
                'picture' => $request->user['picture'],
                'verified_email' => 'true',
                'is_first_time' => 'true',
            ]);
        }

        Redis::set('auth:tokens:' . $request->token, $request->user['email']);
        Redis::expire('auth:tokens:' . $request->token, 3600);

        return response()->json([
            'message' => 'Login successful',
            'user' => Redis::hgetall($userKey)
        ], 200);
    }

    public function login(Request $request) 
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $userKey = 'user:' . $request->email;
        $user = Redis::hgetall($userKey);

        if (!$user || !Hash::check($request->password, $user['password'])) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = Str::random(60);
        Redis::set('auth:tokens:' . $token, $userKey);
        Redis::expire('auth:tokens:' . $token, 3600);

        return response()->json([
            'token' => $token,
            'message' => 'Login successful',
            'user' => $user
        ], 200);
    }

    public function updatePassword(Request $request)
    {
        $userKey = 'user:' . $request->email;
        $user = Redis::hgetall($userKey);

        $hashedPassword = Hash::make($request->password);

        Redis::hmset($userKey, 'password', $hashedPassword);

        return response()->json([
            'message' => 'Password updated successfully'
        ], 201);
    }

    public function completeOnBoarding(Request $request)
    {
        // Get user key from token
        $token = $request->header('Authorization');
        $userKey = Redis::get('auth:tokens:' . $token);

        if (!$userKey) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        // Update user data in Redis
        // selectedDays, daysWithTargetArea, daysWithTargetExercises
        Redis::hmset($userKey, [
            'is_first_time' => 'false',
            'selectedDays' => $request->selectedDays,
            'daysWithTargetArea' => $request->daysWithTargetArea,
            'daysWithTargetExercises' => $request->daysWithTargetExercises,
            'daysWithNotes' => $request->daysWithNotes,
            'daysCompleted' => $request->daysCompleted,
        ]);

        return response()->json([
            'message' => 'Onboarding completed successfully'
        ], 201);
    }

    public function addNewWorkout(Request $request)
    {
        // Get user key from token
        $token = $request->header('Authorization');
        $userKey = Redis::get('auth:tokens:' . $token);

        if (!$userKey) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        $workout = json_decode(json_encode($request->workout));
        // Get the new data from the request
        $newDay = $workout->day;
        $newArea = $workout->areas;
        $newExercises = $workout->exercises;
        $newNotes = $workout->notes;

        // Add workout data to the existing user workout plan
        $user = Redis::hgetall($userKey);
        $day = json_decode($user['selectedDays']);
        $day[] = $newDay;
        $area = json_decode($user['daysWithTargetArea']);
        $area->{$newDay} = $newArea;
        $exercises = json_decode($user['daysWithTargetExercises']);
        $exercises->{$newDay} = $newExercises;
        $notes = json_decode($user['daysWithNotes']);
        $notes->{$newDay} = $newNotes;
        
        // Update user data in Redis
        Redis::hmset($userKey, [
            'selectedDays' => json_encode($day),
            'daysWithTargetArea' => json_encode($area),
            'daysWithTargetExercises' => json_encode($exercises),
            'daysWithNotes' => json_encode($notes),
        ]);

        return response()->json([
            'message' => 'Workout added successfully'
        ], 201);
    }

    public function updateWorkoutExercise(Request $request)
    {
        // Get user key from token
        $token = $request->header('Authorization');
        $userKey = Redis::get('auth:tokens:' . $token);

        if (!$userKey) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        $workout = json_decode(json_encode($request->workout));
        // Get the new data from the request
        $day = $workout->day;
        $exercises = $workout->exercises;

        // Add workout data to the existing user workout plan
        $user = Redis::hgetall($userKey);
        $daysWithTargetExercises = json_decode($user['daysWithTargetExercises']);
        $daysWithTargetExercises->{$day} = $exercises;
        
        // Update user data in Redis
        Redis::hmset($userKey, [
            'daysWithTargetExercises' => json_encode($daysWithTargetExercises),
        ]);

        return response()->json([
            'message' => 'Workout updated successfully'
        ], 201);
    }

    public function completeWorkout(Request $request)
    {
        // Get user key from token
        $token = $request->header('Authorization');
        $userKey = Redis::get('auth:tokens:' . $token);

        if (!$userKey) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        $day = $request->day;
        $completedExercises = $request->completedExercises;

        // Add workout data to the existing user workout plan
        $user = Redis::hgetall($userKey);
        $daysCompleted = json_decode($user['daysCompleted']);
        $daysCompleted->{$day} = "1";

        // Update user data in Redis
        Redis::hmset($userKey, [
            'daysCompleted' => json_encode($daysCompleted),
            'daysWithTargetExercises' => json_encode($completedExercises),
        ]);

        return response()->json([
            'message' => 'Workout completed successfully'
        ], 201);
    }

    public function logout(Request $request) 
    {
        $token = $request->header('Authorization');

        if (Redis::del('auth:tokens:' . $token)) {
            return response()->json([
                'message' => 'Logged out succeessfully'
            ], 200);
        }

        return response()->json([
            'message' => 'Invalid token'
        ], 400);
    }

    public function user(Request $request) 
    {
        $token = $request->header('Authorization');

        $userKey = Redis::get('auth:tokens:' . $token);

        if (!$userKey) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        // Retrieve user data from Redis using the user key
        $user = Redis::hgetall("user:" . $userKey);

        return response()->json($user, 200);
    }
}
