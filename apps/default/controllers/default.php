<?php
require_once("apps/default/controllers/abstract.php");
class DefaultController extends AbstractController {
    public function init() {
        parent::init();

        if (!$this->user->isAuthed()) {
            throw new InitException($this->redirectName("users:Users:login"));
        }
    }

    public function index() {
        // world changing code goes here
    }
}
