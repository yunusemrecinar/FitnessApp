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
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
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
        ]);

        return response()->json([
            'message' => 'User registered successfully'
        ], 201);
    }

    public function login(Request $request) 
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $userKey = 'user:' . $request->email;
        $user = Redis::hgetall($userKey);

        if (!$user) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        if (!Hash::check($request->password, $user['password'])) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = Str::random(60);
        Redis::set('user_token' . $token, $user['email']);
        Redis::expire('user_token' . $token, 3600);

        return response()->json([
            'token' => $token
        ], 200);
    }

    public function logout(Request $request) 
    {
        $token = $request->header('Authorization');

        if (Redis::del('user_token' . $token)) {
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
        $userKey = 'user:' . $request->email;
        $user = Redis::hgetall($userKey);

        return response()->json([
            'id' => $user['id'],
            'email' => $user['email'],
        ], 200);
    }
}
