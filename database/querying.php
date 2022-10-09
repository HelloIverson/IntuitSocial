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

<!DOCTYPE html>
<html>

    <h4 class="data">Info</h4>

    <div>
        <div>
            <?php foreach($data as $user) { ?>

                <div>
                    <div>
                        <div>
                            <h6><?php echo htmlspecialchars($data['last_name']); ?></h6>
                            <div><?php echo htmlspecialchars($data['first_name']); ?></div>
                        </div>    
                    </div>
                </div>

            }
        </div>
    </div>

</html>