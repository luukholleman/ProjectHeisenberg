from rest_framework import serializers
from api.authentication.serializers import UserSerializer
from authentication.models import User
from meeting.models import Meeting, MeetingInvitation, Agenda
from meeting.validators import MimetypeValidator


class AgendaSerializer(serializers.ModelSerializer):
    file = serializers.FileField(allow_empty_file=False,
                                 validators=[MimetypeValidator(allowed_mimetypes=['application/pdf',
                                                                                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])])
    file_name = serializers.CharField(required=False, read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Agenda
        fields = ('file', 'uploaded_at', 'file_name', 'created_by')


class MinuteSerializer(serializers.ModelSerializer):
    file = serializers.FileField(allow_empty_file=False,
                                 validators=[MimetypeValidator(allowed_mimetypes=['application/pdf',
                                                                                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])])

    class Meta:
        model = Agenda
        fields = ('file',)


class AttachmentSerializer(serializers.ModelSerializer):
    file = serializers.FileField(allow_empty_file=False,
                                 validators=[MimetypeValidator(allowed_mimetypes=['application/pdf'])])

    class Meta:
        model = Agenda
        fields = ('file',)


class MeetingInvitationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), read_only=False)
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
    agendas = AgendaSerializer(many=True, read_only=True)

    def update(self, meeting, validated_attrs):
        invitations = meeting.meetinginvitation_set.all()
        for invitation in invitations:
            invitation.delete()

        invitations = validated_attrs.pop('meetinginvitation_set')
        self.save_inviations(meeting, invitations)
        return meeting

    def save_inviations(self, meeting, invitations):
        for invitation in invitations:
            meeting.meetinginvitation_set.create(
                user=invitation['user'],
            )

    def create(self, validated_attrs):
        meeting_invitations = validated_attrs.pop('meetinginvitation_set')

        meeting = Meeting.objects.create(
            name=validated_attrs['name'],
            date_and_time=validated_attrs['date_and_time'],
            location=validated_attrs['location'],
            address=validated_attrs['address'],
        )

        self.save_inviations(meeting, meeting_invitations)
        return meeting

    class Meta:
        model = Meeting
        fields = ('id', 'name', 'description', 'location', 'address', 'date_and_time', 'agendas')
