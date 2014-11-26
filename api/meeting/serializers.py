from rest_framework import serializers
from meeting.models import Meeting, MeetingInvitation


class MeetingInvitationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=False, many=False)

    class Meta:
        model = MeetingInvitation
        fields = ('user',)

class MeetingSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True, max_length=90)
    description = serializers.CharField(required=False)
    location = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    date_and_time = serializers.DateTimeField(required=True)
    invitations = MeetingInvitationSerializer(source='meetinginvitation_set', read_only=False, many=True)

    class Meta:
        model = Meeting
        fields = ('id', 'name', 'description', 'location', 'address', 'date_and_time', 'invitations')