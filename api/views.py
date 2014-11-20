from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.reverse import reverse


class APIRoot(APIView):
    permission_classes = ()

    def get(self, request):
        return Response({
            'login': reverse('api.v1.login', request=request),
            'get-authenticated-user': reverse('api.v1.get-authenticated-user', request=request),
            'users': reverse('api.v1.user-list', request=request),
        })