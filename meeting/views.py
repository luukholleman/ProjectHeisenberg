from django.http import HttpResponseNotFound, HttpResponse
from django.shortcuts import render
from django.utils.encoding import smart_str
from django.views.generic.detail import BaseDetailView
from meeting.models import Agenda


class DownloadMeetingFileView(BaseDetailView):

    def get_object(self, queryset=None):
        if 'type' not in self.kwargs or 'pk' not in self.kwargs:
            return HttpResponseNotFound

        file_type = self.kwargs['type']
        pk = self.kwargs['pk']

        if file_type == 'agenda':
            return Agenda.objects.get(pk=pk)

    def get(self, request, *args, **kwargs):
        """ Check if the user has access to this file then force download """
        file_obj = self.get_object()

        if file_obj is None:
            raise HttpResponseNotFound

        if not file_obj.has_access(user=request.user):
            raise HttpResponseNotFound

        response = HttpResponse(file_obj.file, content_type='application/force-download')
        response['Content-Disposition'] = 'inline; filename=%s' % smart_str(file_obj.file_name) + file_obj.get_extension()
        response['X-Sendfile'] = smart_str(file_obj.file)
        return response