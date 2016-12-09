<!DOCTYPE html>
<html>
<head>
    <!--<script src="js/jquery-3.1.1.min.js"></script>-->
    <script type="text/javascript" src="js/roullet1.js"></script>
    <link rel="stylesheet" type="text/css" href="/css/common.css" media="all">
</head>
<body>
    <table class="roullet">
        <?php for($i = 1; $i <= 4; $i++) { ?>
        <tr class="row-<?php echo $i; ?>">
            <?php for($j = 1; $j <= 4; $j++) { ?>
                <td class="column-<?php echo ($i-1)*4 + $j; ?>"><span><?php echo ($i-1)*4 + $j; ?></span></td>
            <?php } ?>
        </tr>
        <?php } ?>
    </table>
    <div class="control">
        <button  onClick="roullet.start(200)" class="start-roullet">スタート</button>
        <button  onClick="roullet.stop()" class="stop-roullet">ストップ</button> 
        <button  onClick="roullet.reset()" class="reset-roullet">リセット</button>
    </div>

</body>
</html>
