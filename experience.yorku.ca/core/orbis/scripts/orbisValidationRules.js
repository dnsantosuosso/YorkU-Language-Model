$(document).ready(function () {
    $.validator.addMethod(
        "urlValidation",
        function (url, element) {
            var urlWithoutProtocolRegex = /^\s*[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?\s*$/
            if (!url.match(/^https?:/) && urlWithoutProtocolRegex.test(url)) {
                url = "http://" + url.trim();
                $(element).val(url);
            }
            var urlRegex = /^(https?):\/\/[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
            return !url || urlRegex.test(url);
        },
        'URL is not valid');
});
