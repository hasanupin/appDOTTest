<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Form;

class FormProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        Form::component('bsText' , 'component.form.text' , ['name' , 'value' => null , 'attributes'=>[]]);
        Form::component('bsTextArea' , 'component.form.textarea' , ['name' , 'value' => null , 'attributes'=>[]]);
        Form::component('bsDropdown' , 'component.form.dropdown' , ['name' , 'list_dropdown','value' => null , 'attributes'=>[]]);
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
