from django.http import Http404
from django.utils.dateparse import parse_datetime
from rest_framework import generics, viewsets
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response
from rest_framework.serializers import ListSerializer
from api.meeting.serializers import MeetingSerializer, AgendaSerializer
from base.models import Agenda
from meeting.models import Meeting


class MeetingViewSet(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    #todo add logged in permission here
    permission_classes = []

    _from_date = None
    _to_date = None

    @detail_route(methods=['GET'])
    def agendas(self):
        meeting = self.get_object()
        return Response(AgendaSerializer(meeting.agendas.all(), many=True).data)

    def list(self, request, *args, **kwargs):
        if 'from' not in request.QUERY_PARAMS or 'to' not in request.QUERY_PARAMS:
            raise Http404

        self._from_date = parse_datetime(self.request.QUERY_PARAMS['from'])
        self._to_date = parse_datetime(self.request.QUERY_PARAMS['to'])

        return super(MeetingViewSet, self).list(request)

    def get_queryset(self):
        if self._from_date is None or self._to_date is None:
            return Meeting.objects.all()

        return Meeting.objects.filter(date_and_time__range=[self._from_date, self._to_date])


class AgendaViewSet(viewsets.ModelViewSet):
    serializer_class = AgendaSerializer
    permission_classes = []
    queryset = Agenda.objects.all()
