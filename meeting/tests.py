import json
from datetime import datetime, timedelta
from django.test import TestCase
from meeting.models import Meeting


class MeetingTestCase(TestCase):
    def setUp(self):

        dt = datetime.now()
        delta = timedelta(days=1)
        for i in range(0, 10):
            Meeting.objects.create(name="test", description="testdescription", location="t009", address="windesheim",
                                    date_and_time=dt)
            dt += delta

    def test_get_meetings_based_on_filter(self):
        """Test if correct meetings are filtered"""

        from_date = datetime.now()
        to_date = from_date + timedelta(days=5)
        
        response = self.client.get('/api/v1/meetings', {'from': from_date, 'to': to_date})

        data = json.loads(response.content)

        # there should be 5 rows returned from the filter
        self.assertEquals(len(data), 5)
