jQuery(document).ready(function($) {
    $('#youtube-downloader-form').on('submit', function(e) {
        e.preventDefault();

        var youtubeUrl = $('#youtube-url').val();
        var videoFormat = $('#video-format').val();
        var videoQuality = $('#video-quality').val();
        var audioOnly = $('#audio-only').prop('checked');

        // Clear previous error messages
        $('#download-progress').removeClass('error').html('');

        $.ajax({
            type: 'POST',
            url: ajaxurl,
            data: {
                action: 'youtube_downloader_download',
                youtube_url: youtubeUrl,
                video_format: videoFormat,
                video_quality: videoQuality,
                audio_only: audioOnly
            },
            beforeSend: function() {
                $('#download-progress').html('Downloading...');
            },
            success: function(response) {
                if (response.success) {
                    $('#download-progress').html('Download complete!');
                    console.log(response.data);
                } else {
                    $('#download-progress').addClass('error').html('Error: ' + response.data);
                }
            },
            error: function(xhr, status, error) {
                $('#download-progress').addClass('error').html('Error occurred while downloading.');
                console.error(xhr.responseText);
            }
        });
    });
});
