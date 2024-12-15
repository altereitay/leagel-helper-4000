from django.http import HttpResponse
from server.helper import send_message


def index(request):
    msg = send_message('how much is 12C if Fahrenheit')
    print(msg)
    return HttpResponse(msg)
