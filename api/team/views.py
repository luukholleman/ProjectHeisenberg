from django.http import Http404
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from api.team.serializers import TeamSerializer
from team.models import Team


class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    # todo add logged in permission here
    permission_classes = []
    queryset = Team.objects.all()

    @detail_route(methods=['GET'])
    def invitation(self, request, pk=None):
        team = self.get_object()
        return Response(TeamSerializer(team.invitations.all(), many=True).data)

    def list(self, request, *args, **kwargs):
        return super(TeamViewSet, self).list(request)

