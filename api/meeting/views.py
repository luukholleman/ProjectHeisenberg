from django.http import Http404, HttpResponse
from django.utils.dateparse import parse_datetime
from django.utils.encoding import smart_str
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, get_object_or_404, UpdateAPIView
from rest_framework.response import Response
from api.authentication.serializers import UserSerializer
from api.meeting.serializers import MeetingSerializer, AgendaSerializer, AttachmentSerializer, MinuteSerializer, \
    MeetingInvitationSerializer
from meeting.models import Meeting, Agenda
from rest_framework import status, permissions, generics


class MeetingViewSet(viewsets.ModelViewSet):
    serializer_class = MeetingSerializer
    permission_classes = (permissions.IsAuthenticated,)

    _from_date = None
    _to_date = None

    @detail_route(methods=['GET'])
    def invited(self, request, pk=None):
        meeting = self.get_object()
        return Response(MeetingInvitationSerializer(meeting.meetinginvitation_set.order_by('state').all(), many=True).data)

    @detail_route(methods=['GET'])
    def minutes(self, request, pk=None):
        meeting = self.get_object()
        return Response(MinuteSerializer(meeting.minutes.all(), many=True).data)

    @detail_route(methods=['GET'])
    def attachments(self, request, pk=None):
        meeting = self.get_object()
        return Response(AttachmentSerializer(meeting.minutes.all(), many=True).data)

    def list(self, request, *args, **kwargs):
        if 'from' not in request.QUERY_PARAMS or 'to' not in request.QUERY_PARAMS:
            raise Http404

        self._from_date = parse_datetime(self.request.QUERY_PARAMS['from'])
        self._to_date = parse_datetime(self.request.QUERY_PARAMS['to'])

        return super(MeetingViewSet, self).list(request)

    def perform_create(self, serializer):
        meeting = serializer.save()
        meeting.creator = self.request.user
        meeting.save()

    def get_queryset(self):
        # TODO: only list meetings the user has access to
        if self._from_date is None or self._to_date is None:
            return Meeting.objects.all()

        return Meeting.objects.filter(date_and_time__range=[self._from_date, self._to_date])


class MeetingAgendaApiView(ListCreateAPIView, UpdateAPIView):
    serializer_class = AgendaSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_meeting(self):
        return get_object_or_404(Meeting, pk=self.kwargs['meetingId'])

    def perform_create(self, serializer):
        agenda = serializer.save()
        agenda.created_by = self.request.user
        agenda.save()

        meeting = self.get_meeting()
        meeting.agendas.add(agenda)

    def get_queryset(self):
        return self.get_meeting().agendas.order_by('-uploaded_at')

class MeetingMinutesApiView(ListCreateAPIView, UpdateAPIView):
    serializer_class = MinuteSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_meeting(self):
        return get_object_or_404(Meeting, pk=self.kwargs['meetingId'])

    def perform_create(self, serializer):
        minutes = serializer.save()
        minutes.created_by = self.request.user
        minutes.save()

        meeting = self.get_meeting()
        meeting.minutes.add(minutes)

    def get_queryset(self):
        return self.get_meeting().minutes.order_by('-uploaded_at')
