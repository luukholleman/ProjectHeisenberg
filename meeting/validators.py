from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible


@deconstructible
class MimetypeValidator(object):
    validation_message = 'This file is not allowed'
    code = 'invalid'

    def __init__(self, allowed_mimetypes=None):
        self.allowed_mimetypes = allowed_mimetypes

    def __call__(self, value):
        if value.content_type not in self.allowed_mimetypes:
            raise ValidationError(self.validation_message, code=self.code)

    def __eq__(self, other):
        return (
            isinstance(other, MimetypeValidator) and (self.allowed_mimetypes == other.allowed_mimetypes)
        )

    def __ne__(self, other):
        return not (self == other)