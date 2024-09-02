<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Symfony\Component\HttpFoundation\Response;

class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('Authorization');

        if (!$token || !Redis::exists('user_token:' . $token)) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $userEmail = Redis::get('user_token:' . $token);
        $request->merge(['email' => $userEmail]);

        return $next($request);
    }
}
