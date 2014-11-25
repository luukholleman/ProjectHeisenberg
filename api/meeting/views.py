from rest_framework import generics, viewsets
from api.meeting.serializers import MeetingSerializer
from meeting.models import Meeting


class MeetingViewSet(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = []
