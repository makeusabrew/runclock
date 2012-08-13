<?php

class Position extends Object {
    //
}

class Positions extends Table {
    protected $meta = array(
        'columns' => array(
            'altitude' => array(
                'type' => 'text',
            ),
            'altitude_accuracy' => array(
                'type' => 'text',
            ),
            'latitude' => array(
                'type' => 'text',
            ),
            'longitude' => array(
                'type' => 'text',
            ),
            'speed' => array(
                'type' => 'text',
            ),
            'heading' => array(
                'type' => 'text',
            ),
            'timestamp' => array(
                'type' => 'text',
            ),
            'activity_id' => array(
                'type' => 'foreign_key',
                'table' => 'Activities',
            ),
        ),
    );
}
