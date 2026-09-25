pipeline {
  agent {
    kubernetes {
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: buildkit
    image: moby/buildkit:v0.17.2-rootless
    command: ["sleep"]
    args: ["9999999"]
    securityContext:
      runAsUser: 1000
      runAsGroup: 1000
      seccompProfile:
        type: Unconfined
      appArmorProfile:
        type: Unconfined
    env:
    - name: BUILDKITD_FLAGS
      value: --oci-worker-no-process-sandbox
    - name: DOCKER_CONFIG
      value: /home/user/.docker
    volumeMounts:
    - name: docker-config
      mountPath: /home/user/.docker
  - name: git
    image: alpine/git:latest
    command: ["sleep"]
    args: ["9999999"]
  volumes:
  - name: docker-config
    secret:
      secretName: ghcr-secret
      items:
      - key: .dockerconfigjson
        path: config.json
'''
    }
  }
  environment {
    IMAGE = "ghcr.io/samobtw/portfolio"
  }
  stages {
    stage('Build and push') {
      steps {
        container('buildkit') {
          sh '''
            buildctl-daemonless.sh build \
              --frontend dockerfile.v0 \
              --local context=. \
              --local dockerfile=. \
              --output type=image,name=${IMAGE}:${GIT_COMMIT},push=true
          '''
        }
      }
    }
    stage('Bump tag in homelab-config') {
      steps {
        container('git') {
          sshagent(['homelab-config-deploy-key']) {
            sh '''
              export GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
              git clone git@github.com:SaMoBTW/homelab-config.git /tmp/config
              cd /tmp/config
              sed -i "s|image: ghcr.io/samobtw/portfolio:.*|image: ${IMAGE}:${GIT_COMMIT}|" manifests/portfolio/deployment.yaml
              git config user.email "jenkins@homelab"
              git config user.name "jenkins"
              git commit -am "portfolio: ${GIT_COMMIT}"
              git push
            '''
          }
        }
      }
    }
  }
}

