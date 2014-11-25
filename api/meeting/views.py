from django.utils.dateparse import parse_datetime
from rest_framework import generics, viewsets
from api.meeting.serializers import MeetingSerializer
from meeting.models import Meeting


class MeetingViewSet(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    #todo add logged in permission here
    permission_classes = []

    def get_queryset(self):
        from_date = parse_datetime(self.request.QUERY_PARAMS['from'])
        to_date = parse_datetime(self.request.QUERY_PARAMS['to'])

        return Meeting.objects.filter(date_and_time__range=[from_date, to_date])
