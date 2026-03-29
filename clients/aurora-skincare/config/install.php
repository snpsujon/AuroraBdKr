<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Skip Codecanyon purchase step (install step2)
    |--------------------------------------------------------------------------
    |
    | When true, the installer uses the same short path as local dev: step1 → database (step3),
    | without the purchase code screen. Set to true on your own server if you treat it like local.
    |
    */

    'skip_purchase' => filter_var(env('INSTALL_SKIP_PURCHASE', false), FILTER_VALIDATE_BOOLEAN),

];
