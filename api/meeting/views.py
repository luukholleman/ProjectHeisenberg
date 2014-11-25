from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from api.meeting.models import Meeting


class MeetingList(generics.ListCreateAPIView):
    queryset = Meeting.objects.all()
    permission_classes = (IsAuthenticated,)