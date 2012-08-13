<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width; initial-scale=1.0">
    <title>{block name='title'}{setting value="site.title"}{/block}</title>

    <base href="{$base_href}"></base>
</head>
<body>
    <div class=container>
        {block name="body"}
            <p>Your body content goes here. This block will be automatically
            overridden when you extend this base template and re-declare
            this block.</p>
        {/block}
    </div>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    {block name="script"}{/block}
</body>
</html>
