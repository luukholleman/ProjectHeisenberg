from rest_framework.permissions import BasePermission, SAFE_METHODS


class AuthenticatedOrAnonReadAndCreate(BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        AUTHENTICATED_METHODS = SAFE_METHODS + [u'PUT']

        if request.user and request.user.is_authenticated():
            if obj.id == request.user.id and request.method in AUTHENTICATED_METHODS:
                return True

        return False

    def has_permission(self, request, view):
        ANON_METHODS = SAFE_METHODS + [u'POST']

        for method in ANON_METHODS:
            if request.method == method:
              return True

        AUTHENTICATED_METHODS = ANON_METHODS + [u'PUT']

        for method in AUTHENTICATED_METHODS:
            if request.user and request.user.is_authenticated() and request.method == method:
                return True

        return False
