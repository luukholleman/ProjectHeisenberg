from django.core.exceptions import ValidationError


def validate_file_pdf(uploaded_file):
    allowed_types = ['application/pdf', 'application/x-pdf']

    if uploaded_file.content_type not in allowed_types:
        raise ValidationError('File should be PDF')

