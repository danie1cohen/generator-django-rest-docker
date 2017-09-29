FROM python:3
ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code

# install requirements by themselves and early, so this doesnt get recalculated
# unless needed
COPY requirements.txt /code/
RUN pip install -r requirements.txt

<%if ( useCelery ) { %>
# create user for the worker
RUN adduser --disabled-password --gecos '' worker
<% } %>

COPY . /code/
