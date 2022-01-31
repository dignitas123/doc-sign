import datetime
from flask import Blueprint, jsonify

bp = Blueprint("api", __name__, url_prefix="/api")


@bp.route('/test', methods=['GET', 'POST'])
def test():
    return jsonify({'it': 'works',
                    'time': datetime.datetime.utcnow()})
