from flask import Blueprint, jsonify
from .models import MyActivity

bp = Blueprint('main', __name__)

@bp.route('/activities', methods=['GET'])
def get_activities():
    activities = MyActivity.query.all()
    result = [{'id': act.id, 'name': act.name} for act in activities]
    return jsonify(result)
