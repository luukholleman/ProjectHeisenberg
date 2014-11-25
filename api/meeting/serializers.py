from rest_framework import serializers
from meeting.models import Meeting


class MeetingSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=90)
    description = serializers.CharField(required=False)
    location = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    date_and_time = serializers.DateTimeField(required=True)
    participants = serializers.RelatedField()

    class Meta:
        model = Meeting
        fields = ('name', 'description', 'location', 'address', 'date_and_time')
