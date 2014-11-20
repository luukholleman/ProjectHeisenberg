var validationMessages = {
    required: 'This field is required.',
    email: 'This must be an email address.',
    repeat: 'Must be the same value as {0}.'
}

angular.module('punktlichDep').factory('ValidationService', function () {
    function resetValidation(form) {
        var formElement = document.querySelector('[name=' + form.$name + ']');
        Array.prototype.forEach.call(formElement.querySelectorAll('paper-input-decorator'), function (field) {
            field.isInvalid = false;
        });
    }

    function setError(form, name, error) {
        var formElement = document.querySelector('[name=' + form.$name + ']');

        var field = formElement.querySelector('[name=' + name + ']');
        if (!field) {
            return;
        }

        field.parentNode.isInvalid = true;
        field.parentNode.error = error;
    }

    function validateClientSide(form) {
        resetValidation(form);

        var isValid = true;
        for (var type in form.$error) {
            form.$error[type].forEach(function (field) {
                setError(form, field.$name, validationMessages[type] ? validationMessages[type] : type);
                isValid = false;
            });
        }

        for(var x in form)
        {
            if(form[x + '_repeat'] == undefined) continue;
            if(form[x].$modelValue !== form[x + '_repeat'].$modelValue) {
                setError(form, form[x + '_repeat'].$name, validationMessages.repeat.replace('{0}',x));
                isValid = false;
            }
        }
        return isValid;
    }

    function showErrors(form, errors) {
        resetValidation(form);

        for (var field in errors) {
            setError(form, field, errors[field]);
        }
    }

    return {
        validateClientSide: validateClientSide,
        showErrors: showErrors
    }
});