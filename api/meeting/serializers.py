from rest_framework import serializers
from api.authentication.serializers import UserSerializer
from meeting.models import Meeting, MeetingUser


class BasicMeetingSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=90)
    description = serializers.CharField(required=False)
    location = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    date_and_time = serializers.DateTimeField(required=True)


class MeetingWriteSerializer(BasicMeetingSerializer):
    participants = serializers.PrimaryKeyRelatedField(many=True, source='meetinguser_set')

    class Meta:
        model = Meeting
        fields = ('id', 'name', 'description', 'location', 'address', 'date_and_time', 'participants')


class ParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    present_at = serializers.DateTimeField()
    user_state = serializers.ChoiceField(choices=MeetingUser.CHOICES, read_only=True)

    class Meta:
        model = MeetingUser
        fields = ('user', 'present_at', 'user_state', 'user_state')


class MeetingSerializer(BasicMeetingSerializer):
    participants = ParticipantSerializer(many=True, read_only=True, source='meetinguser_set')

    class Meta:
        model = Meeting
        fields = ('id', 'name', 'description', 'location', 'address', 'date_and_time', 'participants')
