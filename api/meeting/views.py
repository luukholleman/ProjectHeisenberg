from rexec import FileWrapper
from django.http import Http404, HttpResponse
from django.utils.dateparse import parse_datetime
from django.utils.encoding import smart_str
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from api.meeting.serializers import MeetingSerializer, AgendaSerializer, AttachmentSerializer, MinuteSerializer
from meeting.models import Meeting, Agenda
from rest_framework import status

class MeetingViewSet(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    # todo add logged in permission here
    permission_classes = []

    _from_date = None
    _to_date = None

    @detail_route(methods=['GET'])
    def agendas(self, request, pk=None):
        meeting = self.get_object()
        return Response(AgendaSerializer(meeting.agendas.all(), many=True).data)

    @detail_route(methods=['GET'])
    def minutes(self, request, pk=None):
        meeting = self.get_object()
        return Response(MinuteSerializer(meeting.minutes.all(), many=True).data)

    @detail_route(methods=['GET'])
    def attachments(self, request, pk=None):
        meeting = self.get_object()
        return Response(AttachmentSerializer(meeting.minutes.all(), many=True).data)

    @detail_route(methods=['POST'])
    def agenda(self, request, pk=None):
        serializer = AgendaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        agenda = serializer.save()

        meeting = self.get_object()
        meeting.agendas.add(agenda)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

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

    @detail_route(methods=['get'])
    def download(self, request, pk=None):
        agenda = self.get_object()
        response = HttpResponse(agenda.file, content_type='application/pdf')
        response['Content-Disposition'] = 'inline; filename=%s' % smart_str(agenda.file)
        response['X-Sendfile'] = smart_str(agenda.file)
        return response
