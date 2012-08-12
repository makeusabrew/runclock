{extends 'default/views/base.tpl'}
{block name=body}
    <form action="{url path='users:Users:login'}" method=post>
        <label for=email>Email</label>
        <input type=email name=email id=email />

        <label for=password>Password</label>
        <input type=password name=password id=password />

        <input type=submit value="Go" />
    </form>
{/block}
