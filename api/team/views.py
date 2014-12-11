from django.http import Http404
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from api.authentication.serializers import ColorSerializer, UserSerializer
from api.team.serializers import TeamSerializer
from team.models import Team


class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    # todo add logged in permission here
    permission_classes = []
    queryset = Team.objects.all()

    @detail_route(methods=['GET'])
    def members(self, request, pk=None):
        team = self.get_object()
        return Response(UserSerializer(team.invitations.all(), many=True).data)

    @detail_route(methods=['GET'])
    def invitation(self, request, pk=None):
        team = self.get_object()
        return Response(TeamSerializer(team.invitations.all(), many=True).data)

    def list(self, request, *args, **kwargs):
        return super(TeamViewSet, self).list(request)

    @detail_route(methods=['GET'])
    def color(self, request, pk=None):
        color = self.get_object().user_color.filter(user_id=request.user.id).get().color

        return Response(ColorSerializer(color).data)
