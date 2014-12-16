from django.http import Http404
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import detail_route, list_route
from rest_framework.generics import UpdateAPIView, ListCreateAPIView, get_object_or_404, DestroyAPIView, \
    RetrieveUpdateDestroyAPIView, ListAPIView, GenericAPIView
from rest_framework.mixins import ListModelMixin, DestroyModelMixin, RetrieveModelMixin
from rest_framework.response import Response
from api.authentication.serializers import ColorSerializer, UserSerializer
from api.team.serializers import TeamSerializer
from authentication.models import User, UserColor, Color
from team.models import Team


class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    # todo add logged in permission here
    permission_classes = (permissions.IsAuthenticated,)

    @detail_route(methods=['GET', 'DELETE'])
    def members(self, request, pk=None, *args, **kwargs):
        team = self.get_object()
        return Response(UserSerializer(team.invitations.all(), many=True).data)

    @detail_route(methods=['GET'])
    def invitation(self, request, pk=None):
        team = self.get_object()
        return Response(TeamSerializer(team.invitations.all(), many=True).data)

    def list(self, request, *args, **kwargs):
        return super(TeamViewSet, self).list(request)

    @list_route()
    def colors(self, request, pk=None):
        teams = Team.objects.filter(user_color__user_id=request.user.pk)
        user_colors = UserColor.objects.filter(team__in=teams)

        team_colors = []
        for user_color in user_colors:
            team_colors.append({user_color.team_set.get().id: user_color.color.color})

        return Response(team_colors)

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


class TeamMemberListApiView(ListAPIView):
    serializer_class = UserSerializer
    # todo fix permissions
    permission_classes = (permissions.AllowAny, )

    def get_team(self):
        return get_object_or_404(Team, pk=self.kwargs['teamId'])

    def get_queryset(self):
        return self.get_team().invitations


class TeamMemberApiView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    # todo fix permissions
    permission_classes = (permissions.AllowAny, )

    def get_team(self):
        return get_object_or_404(Team, pk=self.kwargs['teamId'])

    def get_queryset(self):
        return self.get_team().invitations

    def destroy(self, request, *args, **kwargs):
        member = get_object_or_404(User, pk=self.kwargs['pk'])
        self.get_team().invitations.remove(member)
        return Response(status=status.HTTP_204_NO_CONTENT)