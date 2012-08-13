<?php
require_once("apps/default/controllers/abstract.php");
class UsersController extends AbstractController {
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
