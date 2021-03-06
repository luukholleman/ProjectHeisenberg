from django.core.urlresolvers import reverse
from rest_framework import serializers
from api.authentication.serializers import UserSerializer
from meeting.models import Meeting, MeetingInvitation, Agenda, Minute, Attachment
from meeting.validators import MimetypeValidator


class AgendaSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    file = serializers.FileField(use_url=False, allow_empty_file=False,
                                 validators=[MimetypeValidator(allowed_mimetypes=['application/pdf',
                                                                                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])])
    file_name = serializers.CharField(required=False, read_only=False, allow_blank=True)
    created_by = UserSerializer(read_only=True)
    download_url = serializers.SerializerMethodField()

    def get_download_url(self, agenda):
        return reverse('download_file', kwargs={'pk': agenda.pk, 'type': 'agenda'})

    class Meta:
        model = Agenda
        fields = ('id', 'file', 'uploaded_at', 'file_name', 'created_by', 'download_url')


class MinuteSerializer(serializers.ModelSerializer):
    file = serializers.FileField(allow_empty_file=False,
                                 validators=[MimetypeValidator(allowed_mimetypes=['application/pdf',
                                                                                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])])
    file_name = serializers.CharField(required=False, read_only=False, allow_blank=True)
    created_by = UserSerializer(read_only=True)
    download_url = serializers.SerializerMethodField()

    def get_download_url(self, agenda):
        return reverse('download_file', kwargs={'pk': agenda.pk, 'type': 'agenda'})

    class Meta:
        model = Minute
        fields = ('id', 'file', 'uploaded_at', 'file_name', 'created_by', 'download_url')


class AttachmentSerializer(serializers.ModelSerializer):
    file = serializers.FileField(allow_empty_file=False,
                                 validators=[MimetypeValidator(allowed_mimetypes=['application/pdf',
                                                                                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])])
    file_name = serializers.CharField(required=False, read_only=False, allow_blank=True)
    created_by = UserSerializer(read_only=True)
    download_url = serializers.SerializerMethodField()

    def get_download_url(self, attachment):
        return reverse('download_file', kwargs={'pk': attachment.pk, 'type': 'attachment'})

    class Meta:
        model = Attachment
        fields = ('id', 'file', 'uploaded_at', 'file_name', 'created_by', 'download_url')


class MeetingInvitationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    present_at = serializers.DateTimeField(read_only=True)
    state = serializers.ChoiceField(MeetingInvitation.CHOICES, read_only=True)

    class Meta:
        model = MeetingInvitation
        fields = ('user', 'present_at', 'state')


class MeetingSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=90)
    description = serializers.CharField(required=False)
    location = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    date_and_time = serializers.DateTimeField(required=True)

    def to_representation(self, meeting):
        data = super(MeetingSerializer, self).to_representation(meeting)
        request = self.context['request']
        data['team_abbr'] = meeting.team.abbreviation
        data['color'] = meeting.team.get_team_color(request.user)
        return data

    class Meta:
        model = Meeting
        fields = ('id', 'name', 'description', 'location', 'address', 'date_and_time', 'team')

    def update(self, instance, validated_attrs):
        validated_attrs['team'] = instance.team

        return super(MeetingSerializer, self).update(instance, validated_attrs)

