<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;


class FitnessAppController extends Controller
{
    public function helloWorld(Request $request) 
    {
        // Redis::set('user', 'yunusemre');    
        Redis::lpush('users', ['name' => 'yunus', 'surname' => 'cinar']);
        Redis::lpush('users', 'user2');

        return Redis::lrange('users', 0, -1);
    }
}
