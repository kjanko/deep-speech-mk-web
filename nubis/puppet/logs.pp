fluentd::configfile { $project_name: }

fluentd::source { 'node-output':
  configfile  => $project_name,
  type        => 'tail',
  format      => 'json',
  time_format => '%Y-%m-%dT%H:%M:%S.%L%Z',

  tag         => 'forward.voice.node.stdout',
  config      => {
    'read_from_head' => true,
    'path'           => "/var/log/upstart/${project_name}.log",
    'pos_file'       => "/var/log/upstart/${project_name}.pos",
  },
}
