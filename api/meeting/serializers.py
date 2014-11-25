from rest_framework import serializers
from meeting.models import Meeting


class MeetingSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=90)
    description = serializers.CharField()
    location = serializers.CharField()
    address = serializers.CharField()
    date_and_time = serializers.DateTimeField(required=True)
    participants = serializers.RelatedField()

    class Meta:
        model = Meeting
        fields = ('id',)
