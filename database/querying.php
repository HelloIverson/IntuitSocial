<?php

    $connect = mysqli_connect('localhost', 'pjsk', 'RubbishExecutrixDrink727', 'user_info');

    if(!$connect) {
        echo 'Connection error:' . mysqli_connect_error();
    }

    $sql = 'SELECT * FROM data ORDER BY join_time';

    $result = mysqli_query($connect, $sql);

    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);

    mysqli_free_result($result);

    mysqli_close($connect);

    print_r($data);
?>
