<?php

class AbstractController extends Controller {
    protected $user = null;

    public function init() {
        $this->user = Table::factory('Users')->loadFromSession();
        $this->assign('user', $this->user);
    }
}
