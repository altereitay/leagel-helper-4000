import http

from django.http import JsonResponse
import server.helper as helper
import json


def index(request):
    if request.method != 'POST':
        return JsonResponse({'msg': 'wrong request index'}, status=400)
    try:
        data = json.loads(request.body)
        question = data.get('question', '')
        if question == '':
            return JsonResponse({'msg': 'no question sent'}, status=http.HTTPStatus.BAD_REQUEST)
        user_id = data.get('userID', '')
        if user_id == '':
            return JsonResponse({'msg': 'no user ID sent'}, status=http.HTTPStatus.BAD_REQUEST)
        msg = helper.send_message(user_id, question)
        return JsonResponse({'msg': msg})
    except Exception as err:
        return JsonResponse({'msg': err}, status=http.HTTPStatus.BAD_REQUEST)


def handle_show_main_topics(request):
    if request.method != 'POST':
        return JsonResponse({'msg': 'wrong request topic'}, status=400)
    try:
        data = json.loads(request.body)
        user_id = data.get('userID', '')
        if user_id == '':
            return JsonResponse({'msg': 'no user ID sent'}, status=http.HTTPStatus.BAD_REQUEST)
        msg = helper.send_message(user_id, 'show me the main topics of this conflict')
        return JsonResponse({'msg': msg})
    except Exception as err:
        return JsonResponse({'msg': err}, status=http.HTTPStatus.BAD_REQUEST)


def handle_show_main_points(request):
    if request.method != 'POST':
        return JsonResponse({'msg': 'wrong request points'}, status=400)
    try:
        data = json.loads(request.body)
        user_id = data.get('userID', '')
        if user_id == '':
            return JsonResponse({'msg': 'no user ID sent'}, status=http.HTTPStatus.BAD_REQUEST)
        msg = helper.send_message(user_id, 'show me the main points of this conflict')
        return JsonResponse({'msg': msg})
    except Exception as err:
        return JsonResponse({'msg': err}, status=http.HTTPStatus.BAD_REQUEST)


def handle_check_similarities(request):
    if request.method != 'POST':
        return JsonResponse({'msg': 'wrong request similarities'}, status=400)
    try:
        data = json.loads(request.body)
        user_id = data.get('userID', '')
        if user_id == '':
            return JsonResponse({'msg': 'no user ID sent'}, status=http.HTTPStatus.BAD_REQUEST)
        msg = helper.send_message(user_id,
                                  'show me if there is similarities in the context documents, if there is not than say there are no simailarites')
        return JsonResponse({'msg': msg})
    except Exception as err:
        return JsonResponse({'msg': err}, status=http.HTTPStatus.BAD_REQUEST)


def handle_get_solutions(request):
    if request.method != 'POST':
        return JsonResponse({'msg': 'wrong request solutions'}, status=400)
    try:
        data = json.loads(request.body)
        user_id = data.get('userID', '')
        if user_id == '':
            return JsonResponse({'msg': 'no user ID sent'}, status=http.HTTPStatus.BAD_REQUEST)
        msg = helper.send_message(user_id, 'give me a possible solution to this conflict')
        return JsonResponse({'msg': msg})
    except Exception as err:
        return JsonResponse({'msg': err}, status=http.HTTPStatus.BAD_REQUEST)


def handle_add_context(request):
    if request.method != 'POST':
        return JsonResponse({'msg': 'wrong request context'}, status=400)
    try:
        data = json.loads(request.body)
        user_id = data.get('userID', '')
        if user_id == '':
            return JsonResponse({'msg': 'no user ID sent'}, status=http.HTTPStatus.BAD_REQUEST)
        links = data.get('links', '')
        files = data.get('files', '')
        if links == '' and files == '':
            return JsonResponse({'msg': 'no context sent'}, status=http.HTTPStatus.BAD_REQUEST)
        for link in links:
            helper.add_to_context(user_id, 'user', link)
        for file in files:
            text = helper.process_and_send_file(file)
            helper.add_to_context(user_id, 'user', text)
        return JsonResponse({'msg': 'context has added'})
    except Exception as err:
        return JsonResponse({'msg': err}, status=http.HTTPStatus.BAD_REQUEST)
