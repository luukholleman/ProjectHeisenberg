from django.http import Http404
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from api.authentication.serializers import ColorSerializer
from api.team.serializers import TeamSerializer
from team.models import Team


class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    # todo add logged in permission here
    permission_classes = []

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

    def get_queryset(self):
        """
        Override get_queryset() to filter on multiple values for 'id'
        """

        id_value = self.request.QUERY_PARAMS.get('ids', None)
        if id_value:
            id_list = id_value.split(',')
            queryset = Team.objects.filter(id__in=id_list)

            return queryset

        return Team.objects.all()
