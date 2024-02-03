// 写真をアップロードすると日付を自動入力する
$(function() {
    $('#file-input').on('change', function() {
        var file_input = $('#file-input');
        var file = file_input[0].files[0];
        console.log("写真")

        // EXIF.getDataでexif情報を解析
        EXIF.getData(file, function() {
            // EXIF.getTag(this, "[exifのタグ名]")で、値を取得
            var strDateTime = EXIF.getTag(this, "DateTimeOriginal");

            // 文字列中の:を-に置き換え
            // yyyy-MM-ddの形式にする
            strDateTime = strDateTime.replace(":", "-");
            strDateTime = strDateTime.replace(":", "-");
            var strDate = strDateTime.substr(0, strDateTime.indexOf(" "))

            $("#discover-date").val(strDate);
        });
    });
});