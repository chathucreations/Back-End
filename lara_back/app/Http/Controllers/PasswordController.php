<?php

namespace App\Http\Controllers;
use App\Http\Requests\ResetRequest;
use App\Models\User;
use DB;
use Hash;
use Illuminate\Mail\Message;
use Mail;
use Illuminate\Http\Request;
use Str;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;


class PasswordController extends Controller
{
    public function forgot(Request $request)
    {
        $email = $request->input('email');
        $token = Str::random(12);
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token
        ]);

        Mail::send('emails.reset', ['token' => $token], function (Message $message) use ($email) {
            $message->subject('Reset your password !');
            $message->to($email);
        });

        return response([
            'message' => 'Check your email !'
        ]);
    }

    public function reset(ResetRequest $request)
    {
        $passwordReset = DB::table('password_resets')
            ->where('token', $request->input('token'))->first();


        if (!$usr = User::where('email', $passwordReset->email)->first()) {
            throw new NotFoundHttpException("User Not Found !");
        }

        $usr->password = Hash::make($request->input('password'));
        $usr->save();

        return response([
            'message' => 'Success'
        ]);

    }
}
