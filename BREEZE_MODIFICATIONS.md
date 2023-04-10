# Modifications needed in Laravel Breeze API

## routes/api.php
```php

use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\ProfileController;

Route::middleware(['auth', 'throttle:6,1'])->group(function () {
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::put('/password', [PasswordController::class, 'update'])->name('password.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
```

## models/User.php
```php
use Illuminate\Contracts\Auth\MustVerifyEmail;

/**
     * The attributes should append
     *
     * @var array<int, string>
     */
    protected $appends = [
        'must_verify_email',
    ];

    /**
     * MustVerifyEmail attribute
     *
     * @return boolean
     */
    public function getMustVerifyEmailAttribute()
    {
        return auth()->user() instanceof MustVerifyEmail;
    }
```

## Controllers/ProfileController.php
```php
namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): JsonResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return response()->json(['status' => 'profile-updated']);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): JsonResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['status' => 'profile-deleted']);
    }
}

```

## Contollers/Auth/PasswordController.php
```php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json(['status' => 'password-updated']);
    }
}
```
