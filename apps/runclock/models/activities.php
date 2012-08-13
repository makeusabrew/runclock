<?php

class Activity extends Object {
    protected $table_name = "Activities";
}

class Activities extends Table {
    protected $object_name = "Activity";

    protected $meta = array(
        'columns' => array(
            'user_id' => array(
                'type' => 'foreign_key',
                'table' => 'Users',
            ),
        ),
    );
}
