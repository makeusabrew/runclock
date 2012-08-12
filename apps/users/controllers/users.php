<?php
require_once("apps/default/controllers/abstract.php");
class UsersController extends AbstractController {
    public function init() {
        parent::init();

        switch ($this->path->getAction()) {
            case "login":
                if ($this->user->isAuthed() == true) {
                    throw new InitException($this->redirect("/"), "Already Authed");
                }
                break;
            default:
                if ($this->user->isAuthed() == false) {
                    throw new InitException($this->redirectAction("login"), "Not Authed");
                }
                break;
        }
    }

    public function login() {
        if ($this->request->isPost()) {

            $user = Table::factory('Users')->login(
                $this->request->getVar('email'),
                $this->request->getVar('password')
            );

            if ($user) {
                $user->addToSession();
                
                return $this->redirect("/");
            }

            Log::info("Invalid login attempt from IP [".$this->request->getIp()."] for email [".$this->request->getVar('email')."]");
            $this->addError('Invalid email / password combination');
        }
    }

    public function logout() {
        $this->user->logout();
        return $this->redirect("/");
    }
}
