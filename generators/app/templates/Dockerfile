FROM python:3
ENV PYTHONUNBUFFERED 1

EXPOSE 9000

# install gosu for dynamic user creation
RUN gpg --keyserver ha.pool.sks-keyservers.net --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4
RUN curl -o /usr/local/bin/gosu -SL "https://github.com/tianon/gosu/releases/download/1.4/gosu-$(dpkg --print-architecture)" \
    && curl -o /usr/local/bin/gosu.asc -SL "https://github.com/tianon/gosu/releases/download/1.4/gosu-$(dpkg --print-architecture).asc" \
    && gpg --verify /usr/local/bin/gosu.asc \
    && rm /usr/local/bin/gosu.asc \
    && chmod +x /usr/local/bin/gosu

RUN mkdir /code
WORKDIR /code

<%if ( useLdap ) { %>
# install dependencies
RUN apt-get update
RUN apt-get install -y \
  libsasl2-dev \
  libldap2-dev \
  ldap-utils
<% } %>


# install requirements by themselves and early, so this doesnt get recalculated
# unless needed
COPY requirements.txt /code/
RUN pip install -r requirements.txt

# copy source code
COPY . /code/

# set up entrypoint
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# run a default command
CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:9000", "<%= projectName %>.wsgi"]
