from rest_framework import serializers
from api.authentication.serializers import UserSerializer
from meeting.models import Meeting


class BasicMeetingSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=90)
    description = serializers.CharField(required=False)
    location = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    date_and_time = serializers.DateTimeField(required=True)


class MeetingWriteSerializer(BasicMeetingSerializer):
    participants = serializers.PrimaryKeyRelatedField(many=True, read_only=False)

    class Meta:
        model = Meeting
        fields = ('id', 'name', 'description', 'location', 'address', 'date_and_time', 'participants')


class MeetingSerializer(BasicMeetingSerializer):
    participants = UserSerializer(many=True)

    class Meta:
        model = Meeting
        fields = ('id', 'name', 'description', 'location', 'address', 'date_and_time', 'participants')
